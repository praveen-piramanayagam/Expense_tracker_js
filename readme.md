<!-- Task explaination -->
-- A expense tracker though we can track our expenses by income and expense-wise.
-- we have to enter the reason and select income or expense
-- The income will add amount to balance
-- The expense will reduce the amount to balance
-- The user can edit and delete the entered transaction

<!-- Code explaination -->
-- Initially HTML structured and when user adds new transaction new id is created with description and amount and pushed to array.
-- Setting negative value for the amount when expenses is clicked
-- When the form is submitted the form is refreshed
-- In the added amount edit and delete button is created using DOM
-- When edit button is clicked the clicked values are removed from the list and displayed in form to edit
-- When edit is done the value will make changes on balance according to the amount updated
-- when user clicks delete button confirmation box will display
-- If ok is clicked transaction will be deleted and if cancel it will return false
-- User can click on select all filter and can see all transaction and income and expense can be viewed by the value is '<','>' than    zero.