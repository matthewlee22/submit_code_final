from connections import connect_mqtt, connect_internet
from time import sleep
from constants import ssid, mqtt_server, mqtt_user, mqtt_pass
import motortest2

# Function to handle an incoming message

def cb(topic, msg):

    if topic == b"direction":
        if msg == b"forward":
            print("Forward")
            moveForward()
            sleep(.001)
        elif msg == b"backward":
            moveBackward()
            sleep(.001)
        elif msg == b"left":
            moveLeft()
            sleep(.001)
        elif msg == b"right":
            moveRight()
            sleep(.001)
        elif msg == b"stop":
            stop()
            sleep(.001)
    if topic == b"arm":
        if msg == b"forward":
            print("Arm Forward")
            add_angle1(10)

        elif msg == b"backward":
            print("Arm backward")
            add_angle1(-10)

        elif msg == b"left":
            print("Arm left")
            rotate_left()

        elif msg == b"right":
            print("Arm right")
            rotate_right()
            
        elif msg == b"up":
            print("Arm up")
            add_angle2(10)
    
        elif msg == b"down":
            print("Arm down")
            add_angle2(-10)

        elif msg == b"levelup":
            print("Claw level up")
            add_angle3(10)
    
        elif msg == b"leveldown":
            print("Claw level down")
            add_angle3(-10)

        elif msg == b"in":
            print("Claw in")
            add_angle4(5)
            add_angle5(-5)

        elif msg == b"out":
            print("Claw out")
            add_angle4(-5)
            add_angle5(5)
def main():
    try:
        connect_internet(ssid,password="leekwangsoo")
        client = connect_mqtt(mqtt_server, mqtt_user, mqtt_pass)

        client.set_callback(cb)
        client.subscribe("direction")
        client.subscribe("arm")
        while True:
            client.check_msg()
            sleep(1)

    except KeyboardInterrupt:
        print('keyboard interrupt')
        
        
if __name__ == "__main__":
    main()
