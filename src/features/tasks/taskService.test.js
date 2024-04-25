/* eslint-disable no-undef */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import taskService from "./taskService";

const mock = new MockAdapter(axios);

describe("taskService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("fetches tasks successfully", async () => {
    const token = "mock_token";
    const tasks = [
      {
        _id: "6788e899983y77899",
        text: "Learn Tailwind",
        user: "645735b477777ca48",
        createdAt: "2021-05-28T15:00:00.000Z",
        updatedAt: "2021-05-28T15:00:00.000Z",
        __v: 0,
      },
    ];

    mock
      .onGet("http://localhost:8000/api/tasks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .reply(200, tasks);

    const response = await taskService.getTasks(token);
    expect(response).toEqual(tasks);
  });
});
