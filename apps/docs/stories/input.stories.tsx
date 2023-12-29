import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@msyaifullah/input";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["text", "password"],
    },
    variant: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    onChange: { description: "input action onChange", action: "onChange" },
    onFocus: { description: "input action onFocus", action: "onFocus" },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Input {...props}>{props.children}</Input>,
  name: "Input",
  args: {
    placeholder: "Placeholder Text",
    type: "text",
    variant: "small",
    style: {
      color: "blue",
      border: "1px solid gray",
      padding: 10,
      borderRadius: 10,
    },
    onChange: action("onChange"),
    onFocus: action("onFocus"),
  },
};
