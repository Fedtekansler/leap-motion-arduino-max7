{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 7,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 34.0, 79.0, 1206.0, 899.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-5",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "arduinoToMax.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "" ],
					"patching_rect" : [ 65.0, 49.0, 473.0, 358.0 ],
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 156.0, 606.0, 45.0, 45.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"clipheight" : 91.0,
					"data" : 					{
						"clips" : [ 							{
								"filename" : "/Users/peterkrogshede/Music/air_raid.wav",
								"filekind" : "audiofile",
								"loop" : 0,
								"content_state" : 								{
									"play" : [ 0 ],
									"pitchshift" : [ 1.0 ],
									"quality" : [ "basic" ],
									"timestretch" : [ 0 ],
									"formant" : [ 1.0 ],
									"slurtime" : [ 0.0 ],
									"originallength" : [ 0.0, "ticks" ],
									"basictuning" : [ 440 ],
									"followglobaltempo" : [ 0 ],
									"pitchcorrection" : [ 0 ],
									"formantcorrection" : [ 0 ],
									"mode" : [ "basic" ],
									"pitchshiftcent" : [ 0 ],
									"originaltempo" : [ 120.0 ],
									"speed" : [ 1.0 ],
									"originallengthms" : [ 0.0 ]
								}

							}
 ]
					}
,
					"id" : "obj-3",
					"maxclass" : "playlist~",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "signal", "signal", "signal", "", "dictionary" ],
					"patching_rect" : [ 160.0, 488.0, 150.0, 92.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 115.0, 436.0, 78.0, 22.0 ],
					"style" : "",
					"text" : "print Arduino"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-5", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-5::obj-70" : [ "live.toggle[3]", "live.toggle", 0 ],
			"obj-5::obj-66" : [ "live.toggle[1]", "live.toggle", 0 ],
			"obj-5::obj-1129" : [ "umenu", "umenu", 0 ],
			"obj-5::obj-27" : [ "live.toggle[7]", "live.toggle", 0 ],
			"obj-5::obj-28" : [ "live.toggle[8]", "live.toggle", 0 ]
		}
,
		"dependency_cache" : [ 			{
				"name" : "arduinoToMax.maxpat",
				"bootpath" : "~/Desktop",
				"patcherrelativepath" : "../../../Desktop",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"embedsnapshot" : 0
	}

}
