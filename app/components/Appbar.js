"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const { data: session } = useSession(); // Correctly retrieve session data

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#333', padding: '10px', color: '#fff' }}>
            <div><h2>
                    Project X
                </h2>
                </div>
            <div>
                {session ? ( // Check if session exists
                    <button
                        style={{
                            margin: '0 10px',
                            padding: '8px 16px',
                            backgroundColor: '#FF4136', // Red color for sign out
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                        onClick={() => signOut()} // Call signOut function
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        style={{
                            margin: '0 10px',
                            padding: '8px 16px',
                            backgroundColor: '#007BFF', // Blue color for sign in
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                        onClick={() => signIn()} // Call signIn function
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
}
