
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSystemLogs } from '@/lib/logger';
import type { LogEntry } from '@/lib/logger';
import AdminLayout from '../admin-layout';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function LogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getSystemLogs()
            .then(data => setLogs(data))
            .catch(err => console.error("Failed to fetch system logs:", err))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <AdminLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Log Aktivitas Sistem</CardTitle>
                    <CardDescription>
                        Daftar aktivitas penting yang terjadi di dalam sistem.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Waktu</TableHead>
                                    <TableHead>Aktivitas</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={2} className="h-24 text-center">
                                            <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                        </TableCell>
                                    </TableRow>
                                ) : logs.length > 0 ? (
                                    logs.map((log, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {format(log.timestamp, "d MMM yyyy, HH:mm:ss", { locale: id })}
                                            </TableCell>
                                            <TableCell>{log.message}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} className="h-24 text-center">
                                            Tidak ada log yang tercatat.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
