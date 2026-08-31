import { test, expect } from '@playwright/test';
import { request } from 'node:http';
import { join } from 'node:path';


test.describe('Test API', () => {
    const baseURL = 'https://reqres.in';
    test('GET', async ({ request }) => {
        const response = await request.get(`${baseURL}/api/users?page=2`);

        //Kiểm tra status 
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        //Đọc body dạng json và kiểm tra nội dung
        const responseBody = await response.json();
        expect(responseBody.page).toBe(2);
        expect(responseBody.data.length).toBeGreaterThan(0);
        expect(responseBody.data[0]).toHaveProperty('email');
    });


    test('POST', async ({ request }) => {
        const payload = {
            name: 'Tu Quoc Tuan',
            job: 'QC Automation'
        };

        const response = await request.post(`${baseURL}/api/users`, {
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.name).toBe('Tu Quoc Tuan');
        expect(responseBody.job).toBe('QC Automation');
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('createdAt');
    });

    test('PUT', async ({ request }) => {
        const payload = {
            name: 'Tu Quoc Tuan',
            job: 'ABC'
        }
        const response = await request.put(`${baseURL}/api/users/2`, {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.name).toBe('Tu Quoc Tuan');
        expect(responseBody.job).toBe('ABC');
        expect(responseBody).toHaveProperty('updatedAt');
    })

    test('DELETE', async ({ request }) => {
        const response = await request.delete(`${baseURL}/api/users/2`);
        expect(response.status()).toBe(204);
    })
})

test.describe('Bài tập CRUD', () => {
    const baseURL = 'https://jsonplaceholder.typicode.com/';

    test('GET - Lấy danh sách', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts/1`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
        expect(responseBody.userId).toBe(1);
    })

    test('POST - Tạo 1 post mới', async ({ request }) => {
        const payload = {
            title: 'Hoc Playwright API',
            body: 'Noi dung test automation',
            userId: 10
        }
        const response = await request.post(`${baseURL}/posts`, {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.title).toBe('Hoc Playwright API');
        expect(responseBody.id).toBe(101);
    })

    test('PUT - Cập nhật bài post', async ({ request }) => {
        const payload = {
            id: 1,
            title: 'Title da duoc cap nhat',
            body: 'Body moi',
            userId: 1
        }

        const response = await request.put(`${baseURL}/posts/1`, {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.title).toBe('Title da duoc cap nhat');

    })

    test('DELETE - Xoá post', async ({ request }) => {
        const response = await request.delete(`${baseURL}/posts/1`);
        expect(response.status()).toBe(200);
    })

    test('Tạo bài viết, tạo bình luận cho bài đó', async ({ request }) => {
        const payload = {
            title: "Bai viet cua Tuan",
            body: "Noi dung huong dan API Testing",
            userId: 1
        }

        const response = await request.post(`${baseURL}/posts`, {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responsebody = await response.json();

        expect(response.status()).toBe(201);
        expect(responsebody.id).toBe(101);

        const binhluan = {
            postId: 101,
            name: 'Binh luan test',
            email: 'tuan@example.com',
            body: 'bai viet rat hay'
        }

        const response_bl = await request.post(`${baseURL}/posts/`, {
            data: binhluan,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        expect(response.status()).toBe(201);
        const response_blbody = await response_bl.json();
        expect(response_blbody.postId).toBe(101);
        expect(response_blbody.email).toBe('tuan@example.com');
    })

    test('Query Params & Kiểm tra mảng dữ liệu', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts/?userId=5`);
        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        expect(responsebody.length).toBeGreaterThan(0);
        for (const post of responsebody) {
            expect(post.userId).toBe(5);
        }
    });

    test('Xử lý trường hợp lỗi (Negative Test Case)', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts/9999`);

        expect(response.status()).toBe(404);
        expect(response.ok()).toBeFalsy();
    })
});