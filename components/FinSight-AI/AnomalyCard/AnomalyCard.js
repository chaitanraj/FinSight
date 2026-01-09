import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { AlertTriangle } from 'lucide-react';

const AnomalyCard = ({ onInsight }) => {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!user?.id) return;
        const AnomalyInsights = async () => {
            try {
                const res = await fetch(`/api/forecast/anomaly`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ userId: user.id })
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                if (!data) {
                    console.log("Anomaly data can't be found");
                    return;
                }

                console.log(data);
                const { anomalies, anomaly_days, average_expense } = data;

                if (average_expense < 500) return;

                // const meaningful = anomalies.filter(day =>
                //     Math.abs(day.amount - average_expense) >= 0.25 * average_expense
                // );
                const meaningful=anomalies;

                if (meaningful.length === 0) {
                    onInsight({
                        type: "success",
                        message: "Your spending looks consistent with your usual pattern",
                        icon: AlertTriangle,
                        meta:null,
                    });
                    return;
                }

                const text =
                    meaningful.length > 3
                        ? `Your spending has been more variable on several days recently.`
                        : `We noticed ${meaningful.length} day${meaningful.length > 1 ? "s" : ""
                        } with unusually high spending`;

                onInsight({
                    type: "warning",
                    message: text,
                    meta: {
                        anomalyDays: anomaly_days,
                        anomalies: meaningful,
                        averageExpense: average_expense
                    },
                    priority: "high"
                });

            } catch (e) {
                console.log("Anomaly Insights failed", e);
            }
        }

        AnomalyInsights();

    }, [user]);

    return (
        null
        // <div>
        //     {/* <button onClick={AnomalyInsights} className="border p-2 rounded cursor-pointer">Anomaly insights</button> */}
        //     {message && (
        //         <div className="mt-4 flex items-center gap-2">
        //             <message.icon size={16} />
        //             <span>{message.message}</span>
        //         </div>
        //     )}
        // </div>
    )
}

export default AnomalyCard;
