import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@msyaifullah/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
    },
    variant: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

/**
 * Primary button is important for user interaction
 */
export const Primary: Story = {
  render: (props) => (
    <Button
      {...props}
      onClick={(): void => {
        console.log("Hello from primary!");
      }}
    >
      {props.children}
    </Button>
  ),
  name: "Primary",
  args: {
    children: "Hello",
    type: "button",
    variant: "small",
    style: {
      color: "blue",
      border: "1px solid gray",
      padding: 10,
      borderRadius: 10,
    },
  },
};

/**
 * Secondary button is important for user interaction
 */
export const Secondary: Story = {
  render: (props) => (
    <Button
      {...props}
      onClick={(): void => {
        console.log("Hello from secondary!");
      }}
    >
      {props.children}
    </Button>
  ),
  name: "Secondary",
  args: {
    children: "Hello",
    type: "button",
    variant: "small",
    style: {
      color: "red",
      border: "1px solid gray",
      padding: 10,
      borderRadius: 10,
    },
  },
};
