// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Exploring locators", async () => {
  test("locate input field by placeholder text", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await expect(page.getByPlaceholder("What needs to be done?")).toBeTruthy();
  });

  test("locate input field by role", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await expect(page.getByRole("textbox")).toBeTruthy();
  });

  test("Create a task", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.getByPlaceholder("What needs to be done?").fill("Task 1");
    await page.keyboard.press("Enter");
    await page.getByPlaceholder("What needs to be done?").fill("Task 2");
    await page.keyboard.press("Enter");

    // Assert if two items are entered
    const todo_count = await page.getByTestId("todo-count");
    await expect(todo_count).toHaveText("2 items left");
  });

  test("Delete a task", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.getByPlaceholder("What needs to be done?").fill("Task 1");
    await page.keyboard.press("Enter");
    await page.getByPlaceholder("What needs to be done?").fill("Task 2");
    await page.keyboard.press("Enter");

    // Filter the second task, hover and click on the delete button
    const task_2 = await page
      .getByTestId("todo-item")
      .filter({ hasText: /Task 2/ });

    await task_2.hover();
    await task_2.getByLabel("Delete").click();

    // Assert if two items are entered
    const todo_count = await page.getByTestId("todo-count");
    await expect(todo_count).toHaveText("1 item left");
  });

  test("Edit a task", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await page.getByPlaceholder("What needs to be done?").fill("Task 1");
    await page.keyboard.press("Enter");
    await page.getByPlaceholder("What needs to be done?").fill("Task 2");
    await page.keyboard.press("Enter");

    // Filter the second task, hover and click on the delete button
    await page
      .getByTestId("todo-item")
      .filter({ hasText: /Task 2/ })
      .dblclick();

    await page
      .getByTestId("todo-item")
      .filter({ hasText: /Task 2/ })
      .locator("input[aria-label='Edit']")
      .fill("Task 2 Editted");
    await page.keyboard.press("Enter");

    // Assert if two items are entered
    const todo_count = await page.getByTestId("todo-count");
    await expect(todo_count).toHaveText("2 items left");
  });
});
