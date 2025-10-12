import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { markOrderViewed } from "@/sanity/lib/orders/markOrderViewed"; // ✅ import
import { auth } from "@clerk/nextjs/server"; // ✅ server-side auth
import Image from "next/image";
import { redirect } from "next/navigation";
import { Order } from "@/sanity.types";
import DelayedPage from "@/components/ui/DelayedPage";
import MarkOrdersOnLeave from "@/components/ui/MarkOrdersOnLeave";

export default async function Orders() {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const orders: Order[] = await getMyOrders(userId);

  // ✅ Mark all fetched orders as viewed
  await Promise.all(orders.map(order => markOrderViewed(order._id)));

  const recentOrders = orders.slice(0, 3); // show 3 most recent (adjust as needed)

  return (
    <DelayedPage>
      <div className="flex flex-col item-center justify-center min-h-[1200px] bg-neutral-50 p-4 py-24">
        <div className="bg-neutral-50 p-4 sm:p-8 rounded-3xl text-black w-full mx-auto max-w-4xl 
         min-h-fit uppercase h-full">
          <h1 className="text-4xl font-bold text-black mb-8 text-center w-full">
            My Orders
          </h1>
          {recentOrders.length === 0 ? (
            <div className="text-center">
              <p>You have not placed any orders yet</p>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {recentOrders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="bg-neutral-50 border border-gray-200 rounded-3xl overflow-hidden"
                >
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                      <div>
                        <p className="text-sm mb-1 font-bold">Order No.</p>
                        <p className="font-mono text-sm break-all">{order.orderNumber}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm mb-1">Order Date</p>
                        <p className="font-medium">
                          {order.orderDate
                            ? new Date(order.orderDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Status:</span>
                        <span
                          className={`px-3 py-1 rounded-3xl text-sm ${
                            order.status === "paid"
                              ? "bg-neutral-100 text-black"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm mb-1">Total Amount</p>
                        <p className="font-bold text-lg">
                          {formatCurrency(order.totalPrice ?? 0, order.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 sm:py-4 text-black">
                    <p className="text-sm font-semibold mb-3 sm:mb-4">Order Items</p>
                    <div className="space-y-3 sm:space-y-4">
                      {order.products?.map((product) => (
                        <div
                          key={product.product?._id || Math.random()}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            {product.product?.images?.length ? (
                              <div className="relative h-14 w-14 sm:w-16 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={imageUrl(product.product.images[0]).url()}
                                  alt={product.product?.name ?? ""}
                                  className="object-cover"
                                  fill
                                />
                              </div>
                            ) : null}
                            <div>
                              <p className="font-medium text-sm sm:text-base">
                                {product.product?.name ?? "Unknown product"}
                              </p>
                              <p className="text-sm">
                                Quantity: {product.quantity ?? "N/A"}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium text-right">
                            {product.product?.price && product.quantity
                              ? formatCurrency(
                                  product.product.price * product.quantity,
                                  order.currency
                                )
                              : "N/A"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <MarkOrdersOnLeave orderIds={orders.map(o => o._id)} />
    </DelayedPage>
  );
}