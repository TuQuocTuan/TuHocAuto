import { test, expect } from '@playwright/test';
import { CheckboxPage } from '../pages/CheckboxPage';
import { AddElement } from '../pages/AddElementPage';

test.describe('Kiểm tra AddElement', () => {
    test('Kiểm tra Add Element', async ({ page }) => {
        const addElement = new AddElement(page);
        await addElement.goto();
        await addElement.AddElement(3);
        await expect(page.locator('button[onclick="deleteElement()"]')).toHaveCount(3);
        await addElement.nhanElement(0);
        await expect(page.locator('button[onclick="deleteElement()"]')).toHaveCount(2);
    })
})

test.describe('Kiểm tra checkbox', () => {
    test('Kiểm tra checkbox 1', async ({ page }) => {
        const checkboxPage = new CheckboxPage(page);
        await checkboxPage.goto();
        await checkboxPage.check(0);
        await expect(checkboxPage.checkbox.nth(0)).toBeChecked();
        await checkboxPage.uncheck(1);
        await expect(checkboxPage.checkbox.nth(1)).not.toBeChecked();
    })
})


test('Kiểm tra Dropdown', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown')

    const nut = page.locator('select[id="dropdown"]');
    await nut.selectOption({ value: '2' });
    await expect(page.locator('option[selected="selected"]')).toHaveText('Option 2');
})