## 2024-07-25 - Reliable `aria-live` Announcements

**Learning:** Conditionally rendering an `aria-live` region can cause screen readers to miss announcements. To ensure reliability, the element with the `aria-live` attribute should be persistently rendered in the DOM, with only its content changing dynamically.

**Action:** When implementing announcements or status updates for screen readers, I will always ensure the `aria-live` container element is rendered unconditionally, and only update its child content.
