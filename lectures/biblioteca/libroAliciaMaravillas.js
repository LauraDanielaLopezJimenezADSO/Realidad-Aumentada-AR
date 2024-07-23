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
    const conejo = await loadGLTF('../../assets/models/libroAliciaMaravilllas/aliciaConejo.glb');
    conejo.scene.scale.set(5, 5, 5);
    conejo.scene.position.set(0, 0, 0);

    //segundo modelo 
    const portada = await loadGLTF('../../assets/models/libroAliciaMaravilllas/momentoTe.glb');
    portada.scene.scale.set(0.4, 0.4, 0.4);
    portada.scene.position.set(0, 0, 0);

    
    //tercer modelo 
    const reinaCorazones = await loadGLTF('../../assets/models/libroAliciaMaravilllas/reinaCorazones.glb');
    reinaCorazones.scene.scale.set(0.5, 0.5, 0.5);
    reinaCorazones.scene.position.set(0, 0, 0);

    //cuarto modelo 
    const sombrerero = await loadGLTF('../../assets/models/libroAliciaMaravilllas/sombrerero.glb');
    sombrerero.scene.scale.set(0.5, 0.5, 0.5);
    sombrerero.scene.position.set(0, 0, 0);

    
    //0 representa la primera imagen 
    const conejoAnchor = mindarThree.addAnchor(0);
    conejoAnchor.group.add(conejo.scene);
    const mixerconejo = new THREE.AnimationMixer(conejo.scene);
    //0 controla la animacion del modelo
    

    //1 representa la segunda imagen 
    const portadaAnchor = mindarThree.addAnchor(1);
    portadaAnchor.group.add(portada.scene);
    const mixer = new THREE.AnimationMixer(portada.scene);
    // const action = mixer.clipAction(portada.animations[0]);
    // action.play();

    //2 representa la terceera imagen 
    const reinaCorazonesAnchor = mindarThree.addAnchor(2);
    reinaCorazonesAnchor.group.add(reinaCorazones.scene);
    const mixer1 = new THREE.AnimationMixer(reinaCorazones.scene);

    // //3 representa la primera imagen 
    const sombrereroAnchor = mindarThree.addAnchor(3);
    sombrereroAnchor.group.add(sombrerero.scene);
    const mixersombrerero = new THREE.AnimationMixer(sombrerero.scene);
    


    // //0 controla la animacion del modelo
    const action1 = mixer1.clipAction(reinaCorazones.animations[0]);
    action1.play();
   
    const clock = new THREE.Clock();
    await mindarThree.start();
    renderer.setAnimationLsombrererop(() => {
      const delta = clock.getDelta();
      mixer.update(delta);
      
      mixer1.update(delta);

      mixerconejo.update(delta);

      mixersombrerero.update(delta);
     
      renderer.render(scene, camera);
    });
  }
  start();
  
});


