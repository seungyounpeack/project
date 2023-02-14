package kr.go.guri.cmm.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;

@Component
public class SetDataUtil {
	Logger logger = LoggerFactory.getLogger(SetDataUtil.class);
	
	/***********************************************************************
	 * 
	 * @param dataList : DB연동(selectList()) 로 받은 결과 / 구글 차트 형식으로 변환할 데이터(List 형식)
	 * @param std : 기준이 되는 컬럼
	 * @return json 형태로 변환 된 String 타입 데이터. out.print(data)하면 됨
	 */
	public String dataToJson(List<Map<String, Object>> dataList, String std) {
		String data = null;
		Map<String, Object> data_map = new HashMap<>();//전체 데이터를 담을 map 선언
		//키값들을 배열로 세팅하기
		Set<String> keys_set = dataList.get(0).keySet();
		String[] keys = new String[keys_set.size()];
		int cnt = 0;//cnt는 키의 개수가 된다.
		for(String key : keys_set){
			//logger.info("key : " + key);
			keys[cnt++] = key;
		}
		
		//컬럼의 이름이  std라면 x축 기준이 되므로 string 타입, 나머지는 데이터이므로 number 타입으로 처리
		//logger.info("cnt : " + cnt);
//		List<String> key_num = new ArrayList<>();//키의 순서 맞춰주기
		Map<String, Object> colSet = null;//컬럼의 속성을 지정한다.
		List<Map<String, Object>> cols = new ArrayList<Map<String,Object>>();//속성이 지정된 컬럼들이 담길 List
		
		/*
		 cols에는 컬럼의 정보가 정리되어 담긴다.
		 colSet은 각 컬럼의 type과 label 값을 설정해준다. 각 컬럼을 설정해 준 후 cols에 담는 것이다.
		 cols에 첫 번째 방에 담기는 컬럼이 기준이 되므로, 기준(std)은 0번 인덱스에 담는다.
		 */
		for(int i=0; i<cnt; i++) {
			colSet = new HashMap<String, Object>();
			if(keys[i].equals(std)) {//key값이 std라면 기준이다.
//				logger.info("type : string // " + keys[i]);
				colSet.put("type", "string");
				cols.add(0, colSet);
			}
			else {
//				logger.info("type : number // " + keys[i]);
				colSet.put("type", "number");
				cols.add(colSet);//기준이 아니라면 앞에서부터 차례차례 담는다.
			}
			colSet.put("label", keys[i]);//label은 기준이든 아니든 key값으로 설정한다.
		}
		//logger.info("cols : " + cols);
		
		Map<String, Object> data_col = null;//각 컬럼에 담길 데이터를 담는 map
		List<Map<String, Object>> data_oneRow = null;//각 컬럼의 데이터를 가진 map이 담긴다. 한 row이다.
		Map<String, Object> oneRow = new HashMap<>();//data_oneRow를 jsonObject 형식으로(?) 맞춰주기 위해 data_oneRow를 담을 Map
		List<Map<String, Object>> rows = new ArrayList<>();//생성되는 oneRow를 담아서 저장할 List
		
		Map<String, Object> nowMap = null;
		
		for(int i=0; i<dataList.size(); i++) {
			nowMap = dataList.get(i);//현재 list에서 뽑아온 맵
			data_oneRow = new ArrayList<>();
			oneRow = new HashMap<>();
			for(int j=0; j<cnt; j++) {
				data_col = new HashMap<String, Object>();
				data_col.put("v", nowMap.get(keys[j]));
				//logger.info("i : " + i + ", j : " + j + ", nowMap.get(keys[j]) : " + nowMap.get(keys[j]));
				//logger.info("keys["+j+"] : " + keys[j]);
				if(keys[j].equals(std)) {
					data_oneRow.add(0, data_col);
				}
				else {
					data_oneRow.add(data_col);
				}
			}
			oneRow.put("c", data_oneRow);
			//logger.info("oneRow : " + oneRow);
			rows.add(oneRow);
		}
		
		data_map.put("cols", cols);//최종적인 데이터 완성시키기
		data_map.put("rows", rows);
		
		Gson g = new Gson();
		data = g.toJson(data_map);
		return data;
	}
	
}
