"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReceiptText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 🟡 Order Type
export interface IOrder {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  courses: {
    _id: string;
    title: string;
  }[];
  total: number;
  discount: number;
  finalTotal: number;
  coupon?: {
    _id: string;
    code: string;
  };
  status: "pending" | "completed" | "failed";
  orderId: string;
  paymentId?: string;
  cashfreeOrderId?: string;
  cashfreePaymentStatus?: string;
  cashfreePaymentSessionId?: string;
  cashfreePaymentInfo?: any;
  createdAt: string;
}

// 🟢 Dummy Data
const tempOrders: IOrder[] = [
  {
    _id: "order1",
    user: { _id: "user1", name: "Amit Kumar", email: "amit@example.com" },
    courses: [
      { _id: "course1", title: "JavaScript Mastery" },
      { _id: "course2", title: "React for Beginners" }
    ],
    total: 4000,
    discount: 500,
    finalTotal: 3500,
    coupon: { _id: "coupon1", code: "SAVE500" },
    status: "completed",
    orderId: "ORD123456",
    paymentId: "PAY123456",
    cashfreeOrderId: "CF12345",
    cashfreePaymentStatus: "PAID",
    cashfreePaymentSessionId: "SESSION123",
    cashfreePaymentInfo: { method: "UPI", referenceId: "UPI12345" },
    createdAt: "2025-07-31T10:00:00.000Z"
  },
  {
    _id: "order2",
    user: { _id: "user2", name: "Priya Sharma", email: "priya@example.com" },
    courses: [{ _id: "course3", title: "TypeScript Bootcamp" }],
    total: 1999,
    discount: 0,
    finalTotal: 1999,
    status: "pending",
    orderId: "ORD789012",
    paymentId: "",
    cashfreeOrderId: "",
    cashfreePaymentStatus: "",
    cashfreePaymentSessionId: "",
    cashfreePaymentInfo: {},
    createdAt: "2025-07-31T10:00:00.000Z"
  },
  {
    _id: "order3",
    user: { _id: "user3", name: "Ravi Verma", email: "ravi@example.com" },
    courses: [{ _id: "course4", title: "Node.js API Development" }],
    total: 2500,
    discount: 250,
    finalTotal: 2250,
    coupon: { _id: "coupon2", code: "NODE250" },
    status: "failed",
    orderId: "ORD654321",
    paymentId: "PAY654321",
    cashfreeOrderId: "CF54321",
    cashfreePaymentStatus: "FAILED",
    cashfreePaymentSessionId: "SESSION654",
    cashfreePaymentInfo: { method: "Card", reason: "Insufficient Funds" },
    createdAt: "2025-07-31T10:00:00.000Z"
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setOrders(tempOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ReceiptText className="w-7 h-7" /> All Orders
        </h2>

        {/* 🔽 Filter Dropdown */}
        <Select onValueChange={setFilter} value={filter}>
          <SelectTrigger className="md:w-[180px] bg-[#F9FAFB]">
            <SelectValue placeholder="Filter Orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-x-auto py-0">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>User</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Final</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Coupon</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(12)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4  w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : filteredOrders.map((order, index) => (
                  <TableRow key={order._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.user?.name}</TableCell>
                    <TableCell>{order.user?.email}</TableCell>
                    <TableCell>{order.courses.length}</TableCell>
                    <TableCell>₹{order.total}</TableCell>
                    <TableCell>₹{order.discount}</TableCell>
                    <TableCell>₹{order.finalTotal}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? "complete"
                            : order.status === "failed"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.coupon?.code || "—"}</TableCell>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(`/admin/orders/${order._id}`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
