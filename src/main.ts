import { FlightETAs } from "./FlightETAs";
import { LocalMarketAds } from './LocalMarketAds';
import { ModuleRunner } from "./ModuleRunner";
import { OrderETAs } from "./OrderETAs";
import { ConsumableTimers } from "./ConsumableTimers";
import { FleetETAs } from "./FleetETAs";
import { PostLM } from "./PostLM";
import { ShippingAds } from "./ShippingAds";
import { QueueLoad } from "./QueueLoad";
import { XITHandler } from "./XITHandler";


//chrome.storage.sync.get(["AHIBeautifier_Data"], mainRun(result));
try
{
	browser.storage.local.get("AHIBeautifier_Data").then(mainRun, onError);
	console.log("FireFox detected");
} catch(err)
{
	console.log("Chromium detected");
	chrome.storage.sync.get(["AHIBeautifier_Data"], function(result)
	{
		const runner = new ModuleRunner([
		  new LocalMarketAds(),
		  new OrderETAs(),
		  new FlightETAs(),
		  new ShippingAds(),
		  new PostLM(result["AHIBeautifier_Data"][2]),
		  new QueueLoad(),
		  new ConsumableTimers(result["AHIBeautifier_Data"][0], result["AHIBeautifier_Data"][1]),
		  new FleetETAs(),
		  new XITHandler(result["AHIBeautifier_Data"][1], result["AHIBeautifier_Data"][2])
		]);
		(function () {
		  runner.loop()
		})();
	});
}

function mainRun(result)
{
	const runner = new ModuleRunner([
	  new LocalMarketAds(),
	  new OrderETAs(),
	  new FlightETAs(),
	  new ShippingAds(),
	  new PostLM(result["AHIBeautifier_Data"][2]),
	  new QueueLoad(),
	  new ConsumableTimers(result["AHIBeautifier_Data"][0], result["AHIBeautifier_Data"][1]),
	  new FleetETAs(),
	  new XITHandler(result["AHIBeautifier_Data"][1], result["AHIBeautifier_Data"][2])
	]);
	(function () {
	  runner.loop()
	})();
}

function onError(err)
{
	console.log(err);
}