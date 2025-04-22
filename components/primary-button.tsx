import { Button as Btn } from "@/components/ui/button";

type ButtonProps = {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
};

export default function Button({ variant, children }: ButtonProps) {
    if (variant === "primary") {
        return (
            <Btn className="bg-primary text-primary-foreground">{children}</Btn>
        );
    }

    return <Btn>{children}</Btn>;
}
