import { test, expect } from '@playwright/test';

test.describe('Bài tập Mock API', () => {
    test('Mock Backend trả về danh sách RỖNG', async ({ page }) => {
        await page.route('**/BookStore/v1/Books', async (route) => {
            const responseBody = {
                books: []
            };

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(responseBody)
            })
        })
        await page.goto('https://demoqa.com/books');
        // await expect(page.locator('.rt-noData')).toBeVisible();
        await expect(page.locator('.rt-tbody a')).toHaveCount(0);
    });

    test('Mock Backend bị lỗi Server', async ({ page }) => {
        await page.route('**/BookStore/v1/Books', async (route) => {
            await route.fulfill({
                status: 500,
                message: 'Server Internal Error'
            })
        })
        await page.goto('https://demoqa.com/books');
        await expect(page.locator('.rt-tbody a')).toHaveCount(0);
    });

    test('Sửa dữ liệu trả về từ API thật', async ({ page }) => {
        await page.route('**/BookStore/v1/Books', async (route) => {
            const response = await route.fetch();
            const json = await response.json();

            json.books[0].title = 'Sách đã bị đổi tên';

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(json)
            })
        })
        await page.goto('https://demoqa.com/books');
        await expect(page.locator('.action-buttons a')).toHaveText('Sách đã bị đổi tên');
    });

    test('Giả lập mạng bị ngắt kết nối', async ({ page }) => {
        await page.route('**/BookStore/v1/Books', async (route) => {
            await route.abort();
        })
        await page.goto('https://demoqa.com/books');
        await expect(page.locator('tbody')).toHaveCount(0);
    });
})