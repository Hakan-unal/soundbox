
import { useEffect, useState } from 'react';
import { Card, Switch, Row, Col, Button, Progress, Avatar, Space } from 'antd';
import sound1 from './staticData/sound1.mp3'
import sound2 from './staticData/sound2.mp3'
import sound3 from './staticData/sound3.mp3'
import sound4 from './staticData/sound4.mp3'

import useSound from 'use-sound';
import { showNotification } from './components/general/notification';
import { FcMusic } from "react-icons/fc";
import Meta from 'antd/es/card/Meta';
import { useCountdown } from 'usehooks-ts'


const soundArr = [
  {
    sound: sound1,
    name: "Tame Impala - Yes I'm Changing",
    duration: 271
  },
  {
    sound: sound2,
    name: "Coldplay - Paradise",
    duration: 274
  },
  {
    sound: sound3,
    name: "Coldplay - Viva La Vida",
    duration: 365
  },
  {
    sound: sound4,
    name: "Alec Benjamin - Let Me Down Slowly",
    duration: 177
  },

]



const App = () => {
  // bu hooku dokuyan çocuk kör oldu

  const [loading, setLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(0)
  const [playAudio1, { stop: stopAudio1, duration: duration1 }] = useSound(sound1);
  const [playAudio2, { stop: stopAudio2, duration: duration2 }] = useSound(sound2);
  const [playAudio3, { stop: stopAudio3, duration: duration3 }] = useSound(sound3);
  const [playAudio4, { stop: stopAudio4, duration: duration4 }] = useSound(sound4);

  const [count, { startCountdown, resetCountdown }] =
    useCountdown({
      countStart: 100,
      intervalMs: soundArr[nowPlaying].duration / 100 * 1000,
    })

  const onChange = (checked: boolean) => {
    setLoading(!checked);
    checked && handleStop(nowPlaying)
  };

  const handlePlay = (index: number) => {

    switch (index) {
      case (0): playAudio1(); break;
      case (1): playAudio2(); break;
      case (2): playAudio3(); break;
      case (3): playAudio4(); break;
      default: console.log("test"); break;
    }
    startCountdown()
  };

  const handleStop = (index: number) => {
    switch (index) {
      case (0): stopAudio1(); break;
      case (1): stopAudio2(); break;
      case (2): stopAudio3(); break;
      case (3): stopAudio4(); break;
      default: console.log("test"); break;
    }
    resetCountdown()

  }

  const handlePlayer = (sound: any, index: number) => {

    setNowPlaying(index)

    handleStop(nowPlaying)
    showNotification("success", "Playing", sound.name, null, null)
    handlePlay(index)
  }

  const magic = () => {
    return 100 - count
  }

  return (<Row style={{ marginTop: 100 }}>
    <Col xs={{ span: 21, offset: 1 }} sm={{ span: 12, offset: 6 }}>
      <Switch style={{ marginBottom: 20 }} unCheckedChildren="Show List" checkedChildren="OFF" checked={!loading} onChange={onChange} />
      <Card
        hoverable
        style={{ textAlign: "center" }}
        title={<FcMusic size={35} />}
      // actions={[
      //   <Button>
      //     <AiOutlineDoubleLeft />
      //   </Button>,
      //   <Button onClick={handlePlay}>
      //     {isPlaying ?
      //       <AiFillPauseCircle />
      //       :
      //       <AiFillPlayCircle />
      //     }
      //   </Button>,
      //   <Button>
      //     <AiOutlineDoubleRight />
      //   </Button>,
      // ]}
      >

        <Space direction='vertical' >
          <Progress type="circle" strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} percent={magic()} />
          {!loading && soundArr.map((obj, index) => {
            return (
              <Button
                key={index}
                onClick={() => handlePlayer(obj, index)}
                type='dashed' >
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                  title={<span style={{ fontSize: 10 }}>{obj.name}</span>}
                />
              </Button>
            )
          })}
        </Space>

      </Card>
    </Col>
  </Row>)
}


export default App;
