import FootModelDetectorPathAndroid from 'deepar/models/foot/foot-detector-android.bin';
import FootModelDetectorPathIos from 'deepar/models/foot/foot-detector-ios.bin';
import FootModelObj from 'deepar/models/foot/foot-model.obj';
import FootTrackerPathAndroid from 'deepar/models/foot/foot-tracker-android.bin';
import FootTrackerPathIos from 'deepar/models/foot/foot-tracker-ios.bin';
import deeparWasmPath from 'deepar/wasm/deepar.wasm';
import PostEstimation from 'deepar/wasm/libxzimgPoseEstimation.wasm';
import shoeEffect from './effects/Shoe_PBR';

const MDA = FootModelDetectorPathAndroid;
const MDI = FootModelDetectorPathIos;
const FTA = FootTrackerPathAndroid;
const FTI = FootTrackerPathIos;
const WASM = deeparWasmPath;
const EFFECT = shoeEffect;
const FMO = FootModelObj;
const PE = PostEstimation;

export { MDA, MDI, FTA, FTI, WASM, EFFECT, FMO, PE };
