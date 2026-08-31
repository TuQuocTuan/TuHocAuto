import { test, expect } from '@playwright/test';
import { json } from 'node:stream/consumers';

test.describe('Mock API Network', () => {
    test('Đóng vai BE trả về danh sách tự tạo', async ({ page }) => {
        //Chặn URL API lấy ds trước khi mở trang
        await page.route('**/BookStore/v1/Books', async (route) => {
            //Dữ liệu JSON giả lập 
            const mockResponseBody = {
                books: [
                    {
                        isbn: '9781449325862',
                        title: 'Playwright Automation Tuấn Đẹp Trai',
                        subTitle: 'Học từ cơ bản đến nâng cao',
                        author: 'Tu Quoc Tuan',
                        publish_date: '2026-08-31T00:00:00.000Z',
                        publisher: 'STU Publisher',
                        pages: 999,
                        description: 'Tài liệu automation test thực chiến',
                        website: 'https://github.com/TuQuocTuan',
                    },
                ]
            };

            //Ép trả về status 200
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockResponseBody)
            });
        });
        await page.goto('https://demoqa.com/books');
        await expect(page.locator('.rt-tbody')).toContainText('Playwright Automation Tuấn Đẹp Trai');
        await expect(page.locator('.rt-tbody')).toContainText('Tu Quoc Tuan');
    })
})