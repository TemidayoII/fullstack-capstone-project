---
name: User Story
about: Defines a user story
title: ''
labels: ''
assignees: ''

---

Steps to complete
Create an issue template in GitHub for your project's GitHub repository. Ensure the template includes the components listed below. You may want to copy, paste, and edit this text because it contains the correct markdown syntax you will need for the template. You can learn more about creating the issues template using the GitHub UI in the hints section below.
1
2
3
4
5
6
7
8
9
10
11
12
**As a** [role]
**I need** [function]
**So that** [benefit]
### Details and Assumptions
    * [document what you know]
### Acceptance Criteria
    gherkin
    Given [some context]
    When [certain action is taken]
    Then [the outcome of action is observed]

Copied!

Wrap Toggled!
Hints
Click here for a hint.
Exercise 3: Create new labels and user stories
You need three labels for the rest of the lab:

new - The stories you need to prioritize.
backlog - The stories picked up in the current sprint.
icebox - The stories that don't need to be worked on immediately, but you will work on later.
Steps to complete
Open the labels page for your GitHub repository. You can use this URL after replacing the REPO_URL with your repository URL https://REPO_URL/issues/labels. You will use the New Label button to create the three labels.
Labels page
Add the label new as shown below. You can use different colors.
Create new label
Add backlog and icebox labels similarly. The resulting page should look as follows:
Final labels page
Now that you have the labels, start creating the stories. Simply create a new issue, pick the template you created earlier, and populate the details of the user story. Finally, add the new label to the story.
Exercise 4: Assemble your product backlog
In this exercise, you will create user stories based on the GiftLink Capstone Project. You need to develop several back-end services and a full front end in React.

Steps to complete
Create ten user stories in your GitHub repository, one for each of the following steps of your project:

Finish user stories
Initialize and populate MongoDB
Run skeleton application
Implement a landing page and navigation
Add authentication components and logic
Implement Gifts details page
Implement a search component
Design and implement the comments feature
Containerize the services and applications
Deploy backend and frontend
To create a user story, create a new issue and pick User Story as the template for the issue. Once you create the issue, fill in the details as the template requires.

Add the label new to all the user stories.

Exercise 5: Triage new issues
In this exercise, you will begin to conduct Backlog Refinement by inspecting the issues in the New Issues pipeline and moving them to the Product Backlog or Icebox, depending on when you plan to work on them. Moving the issues to a pipeline simply means applying the new, backlog, and icebox labels. Use your judgment to prioritize user stories based on when they need to be completed. For example, containerizing with Docker and deploying to Kubernetes is something you will do a few sprints from now, so it is not immediately important. An issue will only have one of the three labels at a time.

Steps to complete
Apply the new label to all issues initially if you did not apply the label when creating the stories.

Determine which user stories you will work on immediately and apply the backlog label. Remove the new label from these issues.

Move the remaining stories from New Issues into the Icebox as you will work on them later by removing the new label and applying the Icebox label.

Click here for a hint.
Exercise 6: Refine your product backlog
In this exercise, you will follow the steps of conducting a backlog refinement meeting.You will be the product owner, preparing the product backlog for your next sprint planning meeting. The goal of this preparation is to make all your stories sprint-ready.

Steps to complete
Make sure that all the stories in the Product Backlog have sufficient details to be considered "sprint ready." Pay special attention to the Acceptance Criteria to ensure you have defined the definition of "done."

In GitHub, create a label called technical debt with a yellow color code and add it to your repository.

Create a story called research authentication in React and Express and add the label of technical debt.

Assign labels to your stories. Remember that anything that brings value to the customer is an enhancement, and technical debt can be things developers need but provide no visible customer value.
