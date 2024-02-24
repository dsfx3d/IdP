import {ShaService} from "./ShaService";
import {describeHashService} from "./describeHashService";

describeHashService(ShaService.name, new ShaService());
