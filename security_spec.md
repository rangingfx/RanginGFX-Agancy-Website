# Security Specification - RanginGfx

## 1. Data Invariants
- A `User` profile must be owned by the authenticated user and cannot be changed to another `uid`.
- `Orders` and `Bookings` must be associated with the user who created them.
- `Services` and `Portfolio` are read-only for the public and only manageable by Admins.
- `Reviews` are public for reading but only manageable by Admins. Users cannot self-post reviews to prevent spam and fake testimonials (agency-managed).
- Roles (e.g., `role: 'admin'`) can only be set by other admins or via backend. Users cannot set themselves as admin.

## 2. The "Dirty Dozen" Payloads (Attack Vectors)

### User Profile Spoofing
1. **Payload**: `{"uid": "attacker_id", "email": "victim@example.com", "role": "admin"}` 
   - **Target**: `users/victim_id`
   - **Expected**: PERMISSION_DENIED (User cannot create/update another's profile or escalate role).

### Service Price Manipulation
2. **Payload**: `{"price": 1, "title": "Cheap Service"}`
   - **Target**: `services/standard_web`
   - **Expected**: PERMISSION_DENIED (Only admins can write services).

### Order Hijacking
3. **Payload**: `{"userId": "victim_id", "amount": 1499}`
   - **Target**: `orders/new_order`
   - **Expected**: PERMISSION_DENIED (userId must match request.auth.uid).

### Future Booking
4. **Payload**: `{"date": "2030-01-01", "userId": "attacker_id"}`
   - **Target**: `bookings/new_booking`
   - **Expected**: PERMISSION_DENIED (if strict date validation is applied, otherwise restricted by ownership).

### Review Spam
5. **Payload**: `{"authorName": "Spammer", "rating": 5, "content": "Junk"}`
   - **Target**: `reviews/fake_review`
   - **Expected**: PERMISSION_DENIED (Only admins can write reviews).

### State Shortcut (Order)
6. **Payload**: `{"status": "completed"}`
   - **Target**: `orders/unfinished_order`
   - **Expected**: PERMISSION_DENIED (Users cannot change their own order status to completed).

### ID Poisoning
7. **Payload**: `{"content": "..."}`
   - **Target**: `reviews/` + "A" * 2000
   - **Expected**: PERMISSION_DENIED (ID too long/invalid).

### Shadow User Update
8. **Payload**: `{"uid": "user_id", "email": "valid@email.com", "role": "user", "isVerified": true}`
   - **Target**: `users/user_id`
   - **Expected**: PERMISSION_DENIED (Ghost field `isVerified`).

### Denial of Wallet (Large String)
9. **Payload**: `{"content": "A" * 1024 * 1024}`
   - **Target**: `reviews/new_review`
   - **Expected**: PERMISSION_DENIED (Field size limit exceeded).

### Orphaned Order
10. **Payload**: `{"serviceId": "non_existent_service", "userId": "user_id"}`
    - **Target**: `orders/new_order`
    - **Expected**: PERMISSION_DENIED (Relational check failure).

### Timestamp Spoofing
11. **Payload**: `{"createdAt": "2000-01-01"}`
    - **Target**: `orders/new_order`
    - **Expected**: PERMISSION_DENIED (Must use server timestamp).

### Unauthorized List Query
12. **Query**: `collection("orders")` (Without userId filter)
    - **Expected**: PERMISSION_DENIED (Rule must enforce resource.data.userId == request.auth.uid).

## 3. Test Runner (Draft)
A comprehensive test suite will follow in `firestore.rules.test.ts`.
