/* eslint-disable no-undef */
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import "@testing-library/jest-dom";

import { getTasks } from "./taskSlice";
import taskService from "./taskService";

const mockStore = configureMockStore([thunk]);

const mock = new MockAdapter(axios);

describe("taskSlice", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      task: {
        tasks: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      },
      auth: {
        user: { token: "mock_token" },
      },
    });
  });

  afterEach(() => {
    mock.reset();
    store.clearActions();
  });

  test("calls the taskService to fetch tasks", async () => {
    const token = "mock_token";
    const tasks = [
      {
        _id: "6788e899983y77899",
        text: "Learn Tailwind",
        user: "6557tgut5678u765ca4",
        createdAt: "2021-05-28T15:00:00.000Z",
        updatedAt: "2021-05-28T15:00:00.000Z",
        __v: 0,
      },
    ];

    const getTasksSpy = jest
      .spyOn(taskService, "getTasks")
      .mockResolvedValue(tasks);
    await store.dispatch(getTasks());
    expect(getTasksSpy).toHaveBeenCalledWith(token);
  });
});
