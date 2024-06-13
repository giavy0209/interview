'use client'
import { IPopoverItem, POPOVER_POSITION, Popover } from "@/stories/Popover";

const items: IPopoverItem[] = [
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
]

export default function Home() {
  return (
    <>
      <div className="popover1">
        <Popover button="Buy" items={items} position={POPOVER_POSITION.BOTTOM_RIGHT} />

      </div>
      <div className="popover2">
        <Popover button="Buy" items={items} position={POPOVER_POSITION.MIDDLE_RIGHT} />

      </div>
    </>
  );
}
