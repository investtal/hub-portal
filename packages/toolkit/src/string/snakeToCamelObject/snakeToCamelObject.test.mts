import { expect, test } from "vitest"
import { snakeToCamelObject } from "."

test("Should handle flat snake_case object", () => {
  expect(
    snakeToCamelObject({
      first_name: "John",
      last_name: "Doe",
    }),
  ).toEqual({
    firstName: "John",
    lastName: "Doe",
  })
})

test("Should handle deeply nested objects", () => {
  expect(
    snakeToCamelObject({
      order_id: 123,
      customer_details: {
        contact_info: {
          email_address: "john@example.com",
        },
      },
    }),
  ).toEqual({
    orderId: 123,
    customerDetails: {
      contactInfo: {
        emailAddress: "john@example.com",
      },
    },
  })
})

test("Should handle array of snake_case objects", () => {
  expect(
    snakeToCamelObject({
      items: [
        { item_id: 1, item_name: "Pen" },
        { item_id: 2, item_name: "Pencil" },
      ],
    }),
  ).toEqual({
    items: [
      { itemId: 1, itemName: "Pen" },
      { itemId: 2, itemName: "Pencil" },
    ],
  })
})

test("Should handle empty object", () => {
  expect(snakeToCamelObject({})).toEqual({})
})

test("Should return primitive as-is", () => {
  expect(snakeToCamelObject("string" as any)).toEqual("string")
  expect(snakeToCamelObject(42 as any)).toEqual(42)
  expect(snakeToCamelObject(null as any)).toEqual(null)
  expect(snakeToCamelObject(undefined as any)).toEqual(undefined)
})

test("Should skip keys already in camelCase", () => {
  expect(
    snakeToCamelObject({
      userId: 1,
      user_name: "bob",
    }),
  ).toEqual({
    userId: 1,
    userName: "bob",
  })
})
