import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";

export const CardSkeleton = () => (
    <Card shadow="sm" className="w-fit" radius="lg">
        <CardBody className="overflow-visible p-0">
            <Skeleton className="rounded-lg">
                <div className="w-[245px] h-[342px] rounded-lg bg-default-300"></div>
            </Skeleton>
        </CardBody>
        <CardFooter className="justify-between">
            <div className="w-full">
                <Skeleton className="rounded-lg w-2/3">
                    <div className="h-3 w-2/3 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
            <div className="flex flex-col w-full gap-2">
                <Skeleton className="rounded-lg">
                    <div className="h-4 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-lg">
                    <div className="h-4 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </CardFooter>
    </Card>
)