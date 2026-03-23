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
        const res = await fetch('https://api.github.com/orgs/PhitoDev/repos', {
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            console.error('Failed to fetch from github API:', res.statusText);
            return [];
        }
        const repos: GitHubProject[] = await res.json();
        
        // Filter out irrelevant or empty repositories if needed, and sort
        return repos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (e) {
        console.error('Error fetching github repos:', e);
        return [];
    }
}
