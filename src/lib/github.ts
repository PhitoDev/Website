import { promises as fs } from 'fs';
import path from 'path';

export interface GitHubProject {
    name: string;
    owner: {
        avatar_url: string;
    };
    description: string;
    html_url: string;
    created_at: string;
    topics: string[];
}

export const getThumbnail = (topics: string[]): string => {
    switch (true) {
        case topics.indexOf('android') !== -1:
            return "/images/uploads/android_robot.png";
        case topics.indexOf('kogent') !== -1:
            return "/images/uploads/kogent.png";
        case topics.indexOf('grpc') !== -1:
            return "/images/uploads/grpc.png";
        case topics.indexOf('kotlin') !== -1:
            return "/images/uploads/kotlin.png";
        case topics.indexOf('typescript') !== -1:
            return "/images/uploads/typescript.png";
        case topics.indexOf('python') !== -1:
            return "/images/uploads/python.png";
        case topics.indexOf('go') !== -1:
            return "/images/uploads/gopher.png";
        case topics.indexOf('canipark') !== -1:
            return "/images/uploads/logo.png";
        default:
            return "/img/socials/github.svg";
    }
}

export async function fetchProjects(): Promise<GitHubProject[]> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'admin', 'projects.txt');
        let fileContent = '';
        try {
            fileContent = await fs.readFile(filePath, 'utf-8');
        } catch (err) {
            console.error('Error reading projects.txt:', err);
            return [];
        }

        const repoNames = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const fetchPromises = repoNames.map(async (repo) => {
            const res = await fetch(`https://api.github.com/repos/${repo}`, {
                next: { revalidate: 3600 }
            });
            if (!res.ok) {
                console.error(`Failed to fetch from github API for ${repo}:`, res.statusText);
                return null;
            }
            return res.json();
        });

        const results = await Promise.all(fetchPromises);
        const repos: GitHubProject[] = results.filter(r => r !== null) as GitHubProject[];
        
        // Filter out irrelevant or empty repositories if needed, and sort
        return repos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (e) {
        console.error('Error fetching github repos:', e);
        return [];
    }
}
