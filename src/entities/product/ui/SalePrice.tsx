import { cn } from "@/shared/lib/utils";

interface SalePriceProps {
  /** 정가 */
  originalPrice: number;

  /** 최종 할인가 */
  salePrice: number;

  className?: string;
}

export function SalePrice({
  originalPrice = 0,
  salePrice = 0,
  className,
}: SalePriceProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className={"text-muted-foreground line-through"}>
        {originalPrice.toLocaleString()}
      </span>

      <strong>{salePrice.toLocaleString()}원</strong>
    </div>
  );
}
