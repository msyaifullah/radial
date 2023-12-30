import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Threej } from "@msyaifullah/threej";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Threej> = {
  title: "Components/Threej",
  component: Threej,
  argTypes: {
    
  },
};

export default meta;

type Story = StoryObj<typeof Threej>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Threej {...props}>{props.children}</Threej>,
  name: "Threej",
  args: {
  },
};
