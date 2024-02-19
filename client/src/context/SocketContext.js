import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { userData } = useSelector((state) => state.user);
    const { isLoggedIn } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isLoggedIn && userData?.id) {
            const socket = io(process.env.REACT_APP_SERVER_URL, {
                query: {
                    userId: userData.id,
                },
            });
            setSocket(socket);

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData?.id]);
    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
