import AddToCartButton from "@/components/cart/AddToCartButton.vue";
import { mount } from "@vue/test-utils";
import { NButton } from "naive-ui";
import { createStore } from "vuex";
import { key } from "@/store";
import { nextTick } from "vue";
import { CartActions } from "@/store/modules/cart/state";

jest.mock("naive-ui", () => ({
  __esModule: true,
  ...jest.requireActual("naive-ui"),
  useNotification: jest.fn().mockReturnValue({
    error: jest.fn(),
  }),
}));

describe("Add To cart button", () => {
  let storeMock: any;
  const addProductMock = jest.fn();

  beforeEach(async () => {
    storeMock = createStore({
      actions: {
        ["cart/" + CartActions.ADD_PRODUCT_TO_CART]: addProductMock,
      },
    });
  });

  // Use this to cause an exception during adding an order
  // addProductMock.mockRejectedValueOnce("custom error");

  it("Add to cart happy path", async () => {
    const wrapper = mount(AddToCartButton, {
      global: {
        plugins: [[storeMock, key]],
      },
      props: {
        productId: "testId",
        minOrderQuantity: 10,
      },
      attachToDocument: true,
    });

    const funcSpy = jest.spyOn(wrapper.vm, "onAddToCart");
    const spyDispatch = jest.spyOn(storeMock, "dispatch");
    const cartButtons = wrapper.findAllComponents(NButton);

    const plusButton = cartButtons[0];
    const cartButton = cartButtons[2];

    plusButton.trigger("click");
    await nextTick();
    expect(wrapper.vm["amount"]).toBe(1);

    cartButton.trigger("click");
    await nextTick();

    expect(funcSpy).toHaveBeenCalled();
    expect(spyDispatch).toHaveBeenCalledWith(
      "cart/" + CartActions.ADD_PRODUCT_TO_CART,
      {
        amount: 1,
        id: "testId",
      }
    );
  });
});
