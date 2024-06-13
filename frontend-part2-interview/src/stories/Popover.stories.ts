import type { Meta, StoryObj } from '@storybook/react';
import { POPOVER_POSITION, Popover } from './Popover';
const meta = {
    title: 'Example/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        button: {
            description: 'Text of button'
        },
        position : {
            options : Object.values(POPOVER_POSITION)
        }
    },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        button: 'Button text',
        items: [
            {
                button: '10ml',
                price: '$50.00'
            },
            {
                button: '20ml',
                price: '$90.00',
                description: 'Dummy description'
            },
            {
                button: '40ml',
                price: '$150.00',
                description: 'Dummy description',
                tags: [
                    {
                        name: 'Tag number 1',
                    },
                ]
            },
        ],
        position: POPOVER_POSITION.MIDDLE_LEFT
    },
};
