# Database Schema for Sales Report App

## Entity Relationship Diagram

```mermaid
erDiagram
    sales_agents ||--o{ sales_daily_activities : "performs"
    sales_agents ||--o{ sales_daily_activities : "creates/updates"
    customer ||--o{ sales_daily_activities : "visited_at"
    customer ||--o{ customer_contacts : "has"
    customer ||--o{ phone : "has"
    sales_agents ||--o{ customer_contacts : "creates/updates"
    
    sales_agents {
        int id PK
        text name
        text employee_id UK
        timestamp created_at
        timestamp updated_at
    }
    
    customer {
        int code PK
        text name
        text email
        text address
    }
    
    sales_daily_activities {
        int id PK
        date activity_date
        int sales_agent_id FK
        int customer_code FK
        int shop_rating
        boolean line_added
        text meeting_comment
        numeric latitude
        numeric longitude
        timestamp created_at
        timestamp updated_at
        int created_by_agent_id FK
        int updated_by_agent_id FK
    }
    
    customer_contacts {
        int id PK
        int customer_code FK
        text contact_name
        text position
        int rating
        text phone_number
        timestamp created_at
        timestamp updated_at
        int created_by_agent_id FK
        int updated_by_agent_id FK
    }
    
    phone {
        int id PK
        int customer_code FK
        text phone_number
    }
    
    product {
        text sku PK
        text short_desc
        text full_description
        int stock
        text category FK
        text brand FK
        text name
    }
    
    order {
        text order_id PK
        text status
        text payment_status
        numeric prevat
        numeric vat
        numeric total_amount
        int customer_code FK
        text sales_channel FK
        date order_date
        timestamp created_at
        timestamp updated_at
    }
    
    order_detail {
        int id PK
        text order_id FK
        text product_sku FK
        numeric total_amount
        numeric pieces_order
        timestamp created_at
        timestamp updated_at
    }
    
    rev_channel {
        text name PK
    }
    
    sales_channel {
        text channel PK
        text rev_group FK
    }
    
    uptowntrading_product {
        int id PK
        text rev_channel FK
        text sku FK
        numeric price
        text status
        timestamp created_at
        timestamp updated_at
    }
    
    highsostore_product {
        int id PK
        text rev_channel FK
        text sku FK
        numeric price
        text status
        timestamp created_at
        timestamp updated_at
    }
```

## Key Relationships

1. **Sales Agent Activities**
   - Each `sales_agent` can perform multiple `sales_daily_activities`
   - Each `sales_daily_activities` record is linked to one `sales_agent` (who performed it)
   - Each `sales_daily_activities` record is also linked to the `sales_agent` who created and updated it

2. **Customer Relationships**
   - Each `customer` (shop) can have multiple `sales_daily_activities` (visits)
   - Each `customer` can have multiple `customer_contacts` (people at the shop)
   - Each `customer` can have multiple `phone` numbers

3. **Audit Trail**
   - Both `sales_daily_activities` and `customer_contacts` track who created and updated them
   - This is done via `created_by_agent_id` and `updated_by_agent_id` fields linking to `sales_agents`

4. **Order System**
   - Each `customer` can have multiple `order` records
   - Each `order` can have multiple `order_detail` records
   - Each `order_detail` is linked to a specific `product`

5. **Product Management**
   - Products are stored in the `product` table
   - Website-specific product information is stored in `uptowntrading_product` and `highsostore_product`
   - These tables link to both the `product` table and the `rev_channel` table

## Data Flow for Sales Activity Reporting

1. Sales agent logs in using their `employee_id`
2. Agent selects a customer (shop) they visited
3. Agent records visit details (rating, line added status, comments)
4. Agent's location is captured and stored with the activity
5. Agent can record contact information for people at the shop
6. All data is stored with proper audit trail (who created/updated)

## Phone Number Logic

When a phone number is provided for a customer contact:
1. Check if the phone number already exists for that customer in the `phone` table
2. If it doesn't exist, add a new record to the `phone` table
3. This ensures phone numbers are properly tracked and not duplicated