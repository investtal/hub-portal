import { describe, expect, test } from "vitest"
import { camel2SnakeObject } from "."

describe("camel2SnakeObject", () => {
  test("should convert flat object", () => {
    expect(
      camel2SnakeObject({
        userId: 1,
        userName: "JohnDoe",
        isActive: true,
      }),
    ).toEqual({
      user_id: 1,
      user_name: "JohnDoe",
      is_active: true,
    })
  })

  test("should convert nested object", () => {
    expect(
      camel2SnakeObject({
        userProfile: {
          zipCode: "12345",
          phoneNumber: "555-1234",
        },
      }),
    ).toEqual({
      user_profile: {
        zip_code: "12345",
        phone_number: "555-1234",
      },
    })
  })

  test("should convert array of objects", () => {
    expect(
      camel2SnakeObject({
        items: [
          { productId: 1, productName: "Hat" },
          { productId: 2, productName: "Shoes" },
        ],
      }),
    ).toEqual({
      items: [
        { product_id: 1, product_name: "Hat" },
        { product_id: 2, product_name: "Shoes" },
      ],
    })
  })

  test("should handle deeply nested structures", () => {
    expect(
      camel2SnakeObject({
        orderId: 123,
        customer: {
          customerName: "Alice",
          address: {
            streetName: "Main",
            zipCode: "00000",
          },
        },
      }),
    ).toEqual({
      order_id: 123,
      customer: {
        customer_name: "Alice",
        address: {
          street_name: "Main",
          zip_code: "00000",
        },
      },
    })
  })
})
