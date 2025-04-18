// --- file: src/types.ts ---

export interface User {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

export type ApiResponse<T> = {
    data: T;
    success: boolean;
    error?: string;
};


// --- file: src/utils.ts ---

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateId(): number {
    return Math.floor(Math.random() * 100000);
}

export function log(title: string, payload: any): void {
    console.log(`[${title}]:`, payload);
}


// --- file: src/services/userService.ts ---

import { User, ApiResponse } from '../types';
import { delay, generateId } from '../utils';

const users: User[] = [];

export async function createUser(username: string, email: string): Promise<ApiResponse<User>> {
    await delay(500);
    const newUser: User = {
        id: generateId(),
        username,
        email,
        isActive: true
    };
    users.push(newUser);
    return { data: newUser, success: true };
}

export async function getAllUsers(): Promise<ApiResponse<User[]>> {
    await delay(300);
    return { data: users, success: true };
}


// --- file: src/services/postService.ts ---

import { Post, ApiResponse } from '../types';
import { delay, generateId } from '../utils';

const posts: Post[] = [];

export async function createPost(title: string, content: string, authorId: number): Promise<ApiResponse<Post>> {
    await delay(400);
    const newPost: Post = {
        id: generateId(),
        title,
        content,
        authorId
    };
    posts.push(newPost);
    return { data: newPost, success: true };
}

export async function getPostsByUser(userId: number): Promise<ApiResponse<Post[]>> {
    await delay(200);
    const userPosts = posts.filter(post => post.authorId === userId);
    return { data: userPosts, success: true };
}


// --- file: src/index.ts ---

import { createUser, getAllUsers } from './services/userService';
import { createPost, getPostsByUser } from './services/postService';
import { log } from './utils';

async function main() {
    const userResp = await createUser('johndoe', 'john@example.com');
    if (userResp.success) {
        log('User Created', userResp.data);

        const postResp = await createPost('Welcome Post', 'This is my first post!', userResp.data.id);
        if (postResp.success) {
            log('Post Created', postResp.data);
        }

        const posts = await getPostsByUser(userResp.data.id);
        log('User Posts', posts.data);
    }

    const users = await getAllUsers();
    log('All Users', users.data);
}

main().catch(console.error);