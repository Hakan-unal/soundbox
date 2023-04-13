
import { useEffect, useState } from 'react';
import { Card, Switch, Row, Col, Button } from 'antd';
import sound1 from './staticData/sound1.mp3'
import sound2 from './staticData/sound1.mp3'
import sound3 from './staticData/sound1.mp3'
import sound4 from './staticData/sound1.mp3'

import useSound from 'use-sound';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

import { FcMusic } from "react-icons/fc";

// will add sounds
const soundArr = [sound1, sound2, sound3, sound4]


const App = () => {
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { stop }] = useSound(sound1);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  const playingButton = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };


  return (<Row style={{ marginTop: 100 }}>
    <Col sm={{ span: 8, offset: 8 }}>
      <Switch style={{ marginBottom: 20 }} unCheckedChildren="OFF" checkedChildren="ON" checked={!loading} onChange={onChange} />
      <Card
        hoverable
        style={{ textAlign: "center" }}
        title={<FcMusic size={35} />}
        loading={loading}
        actions={[
          <Button>
            <AiOutlineDoubleLeft />
          </Button>,
          <Button onClick={playingButton}>
            {isPlaying ?
              <AiFillPauseCircle />
              :
              <AiFillPlayCircle />
            }
          </Button>,
          <Button>
            <AiOutlineDoubleRight />
          </Button>,
        ]}
      />
    </Col>
  </Row>)
}


export default App;
