# TODO: Fix TypeError in app/events/page.tsx

- [ ] Update the `max` attribute in the quantity Input to use optional chaining: `selectedEvent?.tickets?.[ticketForm.ticketType as keyof typeof selectedEvent.tickets]?.available || 1`
- [ ] Update the total calculation to use optional chaining: `(selectedEvent?.tickets?.[ticketForm.ticketType as keyof typeof selectedEvent.tickets]?.price || 0) * ticketForm.quantity`
- [ ] Test the fix by running the Next.js app and verifying the ticket dialog works without errors
