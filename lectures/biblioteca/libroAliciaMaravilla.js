import {loadGLTF} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targetsnuevos/targetsAlicia.mind',
      maxTrack: 4,
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    //primer modelo 
    const conejo = await loadGLTF('../../assets/models/libroAliciaMaravilllas/aliciaConejo.glb'); //reina de corazones
    conejo.scene.scale.set(0.2, 0.2, 0.2);
    conejo.scene.position.set(0, 0, 0);

    //segundo modelo 
    const bear = await loadGLTF('../../assets/models/libroAliciaMaravilllas/momentoTe.glb');
    bear.scene.scale.set(0.3, 0.3, 0.3);
    bear.scene.position.set(0, 0, 0);

    
    //tercer modelo 
    const raccoon = await loadGLTF('../../assets/models/libroAliciaMaravilllas/reinaCorazones.glb'); //conejo 
    raccoon.scene.scale.set(0.2, 0.2, 0.2);
    raccoon.scene.position.set(0, 0, 0);

    //cuarto modelo 
    const sombrerero = await loadGLTF('../../assets/models/libroAliciaMaravilllas/reinaCorazones.glb'); //momento te 
    sombrerero.scene.scale.set(0.2, 0.2, 0.2);
    sombrerero.scene.position.set(0, 0, 0);
    
    //0 representa la primera imagen 
    const conejoAnchor = mindarThree.addAnchor(0);
    conejoAnchor.group.add(conejo.scene);
    const mixerconejo = new THREE.AnimationMixer(conejo.scene);

    //1 representa la segunda imagen 
    const bearAnchor = mindarThree.addAnchor(1);
    bearAnchor.group.add(bear.scene);
    const mixer = new THREE.AnimationMixer(bear.scene);

    //2 representa la terceera imagen 
    const raccoonAnchor = mindarThree.addAnchor(2);
    raccoonAnchor.group.add(raccoon.scene);
    const mixer1 = new THREE.AnimationMixer(raccoon.scene);

    //2 representa la terceera imagen 
    const sombrereroAnchor = mindarThree.addAnchor(2);
    sombrereroAnchor.group.add(raccoon.scene);
    const mixerSombrerero = new THREE.AnimationMixer(raccoon.scene);
   
    const clock = new THREE.Clock();
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixer.update(delta);
      
      mixer1.update(delta);

      mixerconejo.update(delta);

      mixerSombrerero.update(delta)
     
      renderer.render(scene, camera);
    });
  }
  start();
  
});
