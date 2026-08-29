import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(user.displayName)

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
           
        },
        
    });
     console.log(payments)

    return (
        <div>
            <h2 className="text-5xl"> Payment History : {payments.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((pay, index) => (
                            <tr key={pay._id}>
                                <th>{index + 1}</th>
                                <td>{pay.displayName}</td>
                                <td>${pay.amount}</td>
                                <td>{pay.transactionId}</td>
                                <td>{pay.paidAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
