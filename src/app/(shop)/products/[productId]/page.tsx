import AddToCartButton from "@/components/products/AddToCartButton/AddToCartButton";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import ProductSlider from "@/components/products/ProductSlider/ProductSlider";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/interfaces/products.interface";
import { formatePrice } from "@/lib/formatter";
import { getProductDetails, getProducts } from "@/services/products.service";
import { SingleProduct } from "@/types/response.type";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductDetailsProps {
  params: {
    productId: string
  };
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { productId } = await params;
  // const [productId, categoryId] = ids
  // console.log(ids);

  const product: SingleProduct = await getProductDetails(productId);
  const productItem = product.data;


  const relatedProducts = await getProducts(8, product.data.category._id)
  console.log('relatedProducts', relatedProducts);

  return (
    <>
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 items-center">
            <div className="col-span-2">


              <ProductSlider images={productItem.images} />
            </div>
            <div className="col-span-1">
              <h1 className="text-xl font-bold mb-4">{productItem.title}</h1>
              <div className="flex gap-1 mb-4">
                <Star className="text-yellow-500 fill-yellow-500" />
                <span>{productItem.ratingsAverage}</span>
                <span className="text-gray-500">
                  ({productItem.ratingsQuantity})
                </span>
              </div>

              <div className="flex justify-between mb-6">
                <p
                  className={
                    productItem.priceAfterDiscount
                      ? "text-gray-500 line-through"
                      : "text-red-600 "
                  }>
                  {formatePrice(productItem.price)}
                </p>
                {productItem?.priceAfterDiscount && (
                  <p className="text-red-600">
                    {formatePrice(productItem.priceAfterDiscount)}
                  </p>
                )}
              </div>

              <p className="mb-6 text-sm">{productItem.description}</p>

              <div className="mb-6">
                <Badge variant={"outline"} className="me-4">
                  {productItem.category.name}
                </Badge>
                <Badge variant={"secondary"} className="me-4">
                  {productItem.brand.name}
                </Badge>
              </div>

              <Separator className="mb-6" />

              <div className="flex">


                <AddToCartButton productId={product.data.id} variant={"destructive"} className="w-full capitalize me-4" />

                <Button variant={"outline"} size={"icon"}>
                  <Heart />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <SectionTitle title="Related Products" subtitle="Explore our products" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {relatedProducts.data.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
