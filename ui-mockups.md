# UI Mockups for Sales Report App

This document provides visual mockups of the key screens and interactions in the sales report application, focusing on the chat-based interface for data entry.

## Login Screen

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |           Sales Agent Login           |    |
|  |                                       |    |
|  |  Employee ID:                         |    |
|  |  +-------------------------------+    |    |
|  |  |                               |    |    |
|  |  +-------------------------------+    |    |
|  |                                       |    |
|  |         [    Login    ]               |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Chat Interface - Initial State

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Welcome, [Agent Name]!       |    |
|  |  Let's record your shop visit.        |    |
|  |                                       |    |
|  |  System: Which shop did you visit     |    |
|  |  today?                               |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | Type shop name...         [  Send  ]  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Shop Autocomplete

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Which shop did you visit     |    |
|  |  today?                               |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | ABC                      [  Send  ]  |    |
|  +---------------------------------------+    |
|  | ABC Store                             |    |
|  | ABC Supermarket                       |    |
|  | ABC Electronics                       |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Shop Rating Question

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Which shop did you visit     |    |
|  |  today?                               |    |
|  |                                       |    |
|  |  You: ABC Store                       |    |
|  |                                       |    |
|  |  System: How would you rate this      |    |
|  |  shop on a scale of 1-5?              |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | [1] [2] [3] [4] [5]                  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Line Added Question

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: How would you rate this      |    |
|  |  shop on a scale of 1-5?              |    |
|  |                                       |    |
|  |  You: 4                               |    |
|  |                                       |    |
|  |  System: Did you add a new product    |    |
|  |  line to this shop?                   |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | [  Yes  ]        [  No  ]            |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Meeting Comments

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Did you add a new product    |    |
|  |  line to this shop?                   |    |
|  |                                       |    |
|  |  You: Yes                             |    |
|  |                                       |    |
|  |  System: Please add any comments      |    |
|  |  about your meeting.                  |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | Type your comments...     [  Send  ]  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Location Capture

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Please add any comments      |    |
|  |  about your meeting.                  |    |
|  |                                       |    |
|  |  You: Owner was interested in new     |    |
|  |  product line. Will follow up next    |    |
|  |  month.                               |    |
|  |                                       |    |
|  |  System: We need to capture your      |    |
|  |  current location.                    |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  |     [  Share My Location  ]           |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Location Captured

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: We need to capture your      |    |
|  |  current location.                    |    |
|  |                                       |    |
|  |  System: Location captured            |    |
|  |  successfully: 13.756331, 100.501762  |    |
|  |                                       |    |
|  |  System: Did you speak with a         |    |
|  |  specific person at the shop?         |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | [  Yes  ]        [  No  ]            |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Contact Information

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Did you speak with a         |    |
|  |  specific person at the shop?         |    |
|  |                                       |    |
|  |  You: Yes                             |    |
|  |                                       |    |
|  |  System: What is their name?          |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | Type contact name...     [  Send  ]  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Contact Position

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: What is their name?          |    |
|  |                                       |    |
|  |  You: John Smith                      |    |
|  |                                       |    |
|  |  System: What is their position?      |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | Type position...         [  Send  ]  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Contact Rating

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: What is their position?      |    |
|  |                                       |    |
|  |  You: Store Manager                   |    |
|  |                                       |    |
|  |  System: How would you rate this      |    |
|  |  contact (1-5)?                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | [1] [2] [3] [4] [5]                  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Contact Phone

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: How would you rate this      |    |
|  |  contact (1-5)?                       |    |
|  |                                       |    |
|  |  You: 5                               |    |
|  |                                       |    |
|  |  System: What is their phone number?  |    |
|  |  (optional)                           |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | Type phone number...     [  Send  ]  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Submission Summary

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Here's a summary of your     |    |
|  |  report:                              |    |
|  |                                       |    |
|  |  Shop: ABC Store                      |    |
|  |  Rating: 4/5                          |    |
|  |  Line Added: Yes                      |    |
|  |  Comments: Owner was interested in    |    |
|  |  new product line. Will follow up     |    |
|  |  next month.                          |    |
|  |  Contact: John Smith (Store Manager)  |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | [  Submit Report  ]                  |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Submission Confirmation

```
+-----------------------------------------------+
|                                               |
|                 Sales Report                  |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |  System: Your report has been         |    |
|  |  successfully submitted!              |    |
|  |                                       |    |
|  |  System: Would you like to submit     |    |
|  |  another report?                      |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  | [  New Report  ]    [  Logout  ]     |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Mobile View - Chat Interface

```
+---------------------------+
|                           |
|       Sales Report        |
|                           |
| +-------------------------+ |
| |                         | |
| | System: Which shop did  | |
| | you visit today?        | |
| |                         | |
| | You: ABC Store          | |
| |                         | |
| | System: How would you   | |
| | rate this shop on a     | |
| | scale of 1-5?           | |
| |                         | |
| |                         | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| | Type here...  [ Send ]  | |
| +-------------------------+ |
|                           |
+---------------------------+
```

## Mobile View - Location Capture

```
+---------------------------+
|                           |
|       Sales Report        |
|                           |
| +-------------------------+ |
| |                         | |
| | System: We need to      | |
| | capture your current    | |
| | location.               | |
| |                         | |
| |                         | |
| |                         | |
| |                         | |
| |                         | |
| |                         | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| | [ Share My Location ]   | |
| +-------------------------+ |
|                           |
+---------------------------+
```

## Design Notes

1. **Chat Bubbles**
   - System messages appear with a light gray background
   - User responses appear with a blue background
   - Error messages appear with a light red background

2. **Input Types**
   - Text input: Standard text field with send button
   - Number input (ratings): Clickable number buttons (1-5)
   - Boolean input (yes/no): Two button options
   - Location: Special button to trigger geolocation API

3. **Responsive Design**
   - Desktop: Full width chat interface with ample whitespace
   - Mobile: Optimized for smaller screens with adjusted padding
   - Input controls resize based on screen size

4. **Visual Hierarchy**
   - Clear visual distinction between system prompts and user inputs
   - Important actions (like "Submit Report") are highlighted
   - Progress through the form is visible in the chat history

5. **Accessibility Considerations**
   - All interactive elements have appropriate focus states
   - Color contrast meets WCAG standards
   - Form inputs have proper labels and aria attributes