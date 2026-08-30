import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Thực hành upload và download file', () => {
    test('Test upload', async ({ page }) => {
        await test.step('1. Upload file', async () => {
            await page.goto('https://demoqa.com/upload-download');
            const nutup = await page.locator('#uploadFile');
            await nutup.setInputFiles('./data/test-file.txt');
            await expect(page.locator('#uploadedFilePath')).toContainText('test-file.txt');
        })

        await test.step('2. Test download', async () => {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                page.locator('#downloadButton').click()
            ])

            const filename = download.suggestedFilename();
            await download.saveAs('./downloads/' + filename);
            await expect(filename).toBe('sampleFile.jpeg');
        })
    })
})