import {useCheckbox, VisuallyHidden, Card, CardBody, Image, CheckboxProps, Checkbox, tv} from "@nextui-org/react";
import { CardType } from "../types/card.js";

const checkbox = tv({
    slots: {
        base: ''
    },
    variants: {
        isSelected: {
            true: {
                base: "opacity-100"
            },
            false: {
                base: "opacity-50"
            }
        }
    }
});

interface props extends CheckboxProps {
    card: CardType
}

export const CardCheckbox = (props: props) => {
  const {
    isSelected,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props
  })
  const styles = checkbox({ isSelected });
  const card = props.card;
  return (
    <label {...getBaseProps()}>
        <VisuallyHidden>
            <input {...getInputProps()} />
        </VisuallyHidden>
        <div
            {...getLabelProps()}
        >
            <Card
                classNames={{
                    base: styles.base()
                }}
                shadow="sm"
            >
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        src={card.images.small}
                        width="100%"
                        className="w-full object-cover h-[260px]"
                    />
                    <Checkbox
                        className="absolute z-50 top-4 left-4"
                        size="sm"
                        isSelected={isSelected}
                        isDisabled
                    />
                </CardBody>
            </Card>
        </div>
    </label>
  )
}
