'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderDetailsPage() {
  const order = {
    _id: "123456",
    user: {
      name: "Rohit Sharma",
      email: "rohit@example.com",
    },
    orderId: "ORD987654321",
    status: "completed",
    paymentAttempts: [
      {
        status: "failed",
        date: "2025-07-28T10:00:00.000Z",
      },
      {
        status: "failed",
        date: "2025-07-28T10:05:00.000Z",
      },
      {
        status: "completed",
        date: "2025-07-28T10:10:00.000Z",
      },
    ],
  };
   const router = useRouter();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 bg-white rounded-xl shadow-md">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      
      <h2 className="text-3xl font-bold border-b pb-2">🧾 Order Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">User</p>
          <p className="font-medium">{order.user?.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{order.user?.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">{order.orderId}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
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
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Attempts</p>
          <p className="font-medium">{order.paymentAttempts?.length || 1}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Success</p>
          <p className="font-medium text-green-600">
            {order.paymentAttempts?.filter(p => p.status === "completed").length || 0}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Failed</p>
          <p className="font-medium text-red-600">
            {order.paymentAttempts?.filter(p => p.status === "failed").length || 0}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">💳 Payment Attempts</h3>
        <ul className="space-y-2">
          {order.paymentAttempts?.map((attempt, i) => (
            <li
              key={i}
              className="border p-3 rounded-lg flex justify-between items-center"
            >
              <span
                className={`font-medium capitalize ${
                  attempt.status === "completed" ? "text-green-600" : "text-red-600"
                }`}
              >
                {attempt.status}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(attempt.date).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
