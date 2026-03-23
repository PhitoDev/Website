import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostBySlug(slugArray: string[], collection: string = 'blog') {
  const slug = slugArray.join('-');
  const directories = ['android', 'go', 'kotlin', 'ml', 'opinion', 'python', 'poetry'];
  
  for (const dir of directories) {
    const fullPath = path.join(contentDirectory, dir, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return { slug, frontmatter: data, content, collection: dir };
    }
  }
  
  // Try joining with slash instead if it's nested
  const slugNested = slugArray.join('/');
  for (const dir of directories) {
    const fullPath = path.join(contentDirectory, dir, `${slugNested}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return { slug: slugNested, frontmatter: data, content, collection: dir };
    }
  }
  
  return null;
}

export function getAllPosts() {
  const directories = ['android', 'go', 'kotlin', 'ml', 'opinion', 'python', 'poetry'];
  const posts: any[] = [];
  
  directories.forEach(dir => {
    const dirPath = path.join(contentDirectory, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.filter(f => f.endsWith('.md')).forEach(file => {
        const fullPath = path.join(dirPath, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        posts.push({
          slug: file.replace(/\.md$/, ''),
          collection: dir,
          frontmatter: data
        });
      });
    }
  });
  
  return posts.sort((a, b) => {
    if (!a.frontmatter.date) return 1;
    if (!b.frontmatter.date) return -1;
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}
