// import * as PusherPushNotifications from '@pusher/push-notifications-web'
import Pusher from 'pusher-js';
import { APP_CLUSTER, APP_KEY } from '../utils/stateList';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import soundAlert from "/Xylophone.mp3"

const useNotification = () => {
    const pusher = new Pusher(APP_KEY, {
        cluster: APP_CLUSTER,
        encrypted: true
    });

    useEffect(() => {
        if (("Notification" in window)) {
            // console.log("Notifications are supported");
            if ("Notification" in window) {
                // console.log("Browser supports desktop notification");
                Notification.requestPermission()
            }
        }
        // else {
        //     // console.log("Browser does not support desktop notification");
        // }

    }, [])

    useEffect(() => {
        const channel = pusher.subscribe('waiter-notified');
        channel.bind('waiter-notified', event => {
            const audio = new Audio(soundAlert);
            audio.play();
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification('کافه رستوران اورمان', {
                    body: `میز شماره ${event?.table?.number.toUpperCase()} درخواست گارسون کرده است.`,
                    icon: "/logo.png"
                });
            } else {
                toast.info(`میز شماره ${event?.table?.number.toUpperCase()} درخواست گارسون کرده است.`, {
                    autoClose: false
                })
            }

        });
        return () => {
            channel.unbind('waiter-notified');
            pusher.unsubscribe('waiter-notified');
        };

    }, [])
}

export default useNotification