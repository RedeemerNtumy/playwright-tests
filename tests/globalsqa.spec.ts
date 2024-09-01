import {test,expect, type Page} from '@playwright/test';

const URL= "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login";
const deposit = "5000";
const withdrawal = (parseFloat(deposit) * 0.2).toString();
const moneyAfterWithdrawal="4000";
const firstName="Redeemer";
const lastName="Ntumy";
const postCode="123456";


test("Tests",async({page})=>{

    // 1. Visit
    await page.goto(URL);

    // 2. Going into the Manager's Portal
    await page.getByText("Bank Manager Login",{exact:true}).click();

    // 3. Creating a Customer
    await page.getByText("Add Customer",{exact:true}).click();
    await page.getByPlaceholder("First Name",{exact:true}).fill(firstName);
    await page.getByPlaceholder("Last Name",{exact:true}).fill(lastName);
    await page.getByPlaceholder("Post Code",{exact:true}).fill(postCode);
    await page.getByText("Add Customer",{exact:true}).nth(1).click();

    // 4. Open Account for Customer
    await page.getByText("Open Account",{exact:true}).click();
    await page.locator('#userSelect').click();
    await page.selectOption('#userSelect', '6');
    await page.locator('#currency').click();
    await page.selectOption('#currency', 'Dollar');
    await page.getByText("Process",{exact:true}).click();

    // 5. Assertion of Customer in List
    await page.getByText("Customers",{exact:true}).click();
    await page.getByPlaceholder("Search Customer",{exact:true}).fill(firstName);
    await expect(page.getByText(firstName,{exact:true})).toBeVisible;

    // 6. Go back Home
    await page.getByText("Home",{exact:true}).click();

    // 7. Login Customer
    await page.getByText("Customer Login",{exact:true}).click();
    await page.locator('#userSelect').click();
    await page.selectOption('#userSelect', '6');
    await page.getByText("Login",{exact:true}).click();

    // 8. Make a deposit
    await page.getByText("Deposit",{exact:true}).click();
    await page.getByPlaceholder("amount",{exact:true}).fill(deposit);
    await page.getByText("Deposit",{exact:true}).nth(1).click();

    // 9. Withdraw 20%
    await page.getByText("Withdrawl",{exact:true}).click();
    await page.waitForTimeout(2000);
    await page.getByPlaceholder("amount",{exact:true}).fill(withdrawal);
    await page.getByPlaceholder("amount").press('Enter');
    
    // 10. Asserrting Balance
    await expect(page.getByText(moneyAfterWithdrawal,{exact:true})).toBeVisible;

    // 11. Go back Home
    await page.getByText("Home",{exact:true}).click();

    // 12. Go into Manager's Portal
    await page.getByText("Bank Manager Login",{exact:true}).click();

    // 13. Delete Customer
    await page.getByText("Customers",{exact:true}).click();
    await page.getByPlaceholder("Search Customer",{exact:true}).fill(firstName);
    await expect(page.getByText(firstName,{exact:true})).toBeVisible;
    await page.getByText("Delete").nth(1).click();
})
