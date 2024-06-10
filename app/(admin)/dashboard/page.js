"use client"
import styles from "./dashboard.module.css";
import { Card } from "flowbite-react";

export default function Dashboard() {
    return (
        <>
            <div className={`${styles.dashboardContainer}`} >
                <Card href="/users" className="max-w-sm mb-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Total Users
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </Card>
                <Card href="/property" className="max-w-sm mb-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Total Properties
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </Card>
                <Card href="/builder" className="max-w-sm mb-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Total Builder
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </Card>
                <Card href="/projectInquiry" className="max-w-sm mb-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Total Enquiry
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                </Card>
            </div>
        </>
    )
}