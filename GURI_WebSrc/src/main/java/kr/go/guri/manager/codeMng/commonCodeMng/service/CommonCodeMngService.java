/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kr.go.guri.manager.codeMng.commonCodeMng.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
  * 관리자 > 공통코드 관리용 Service 클래스
 * @author 김부권
 * @since 2022. 06. 15.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *       수정일			     수정자		               수정내용
 *  --------------    -------------   ----------------------
 *  2022. 06. 15.   	     김부권                        최초 생성
 *   
 * </pre>
 */
public interface CommonCodeMngService {

	
	/**
	 * 공통코드 목록 조회하기
	 * @param searchVO
	 * @return
	 * @throws Exception
	 */
	List<Map<String, Object>> selectTopCodeList() throws SQLException , Exception;

	/**
	 * 
	 * @param param
	 * @return
	 * @throws Exception 
	 * @throws SQLException 
	 */
	List<Map<String, Object>> selectSubCodeList(Map<String, Object> param) throws SQLException, Exception;
	
	/**
	 * 
	 * @param param
	 * @return
	 * @throws Exception 
	 * @throws SQLException 
	 */
	List<Map<String, Object>> selectGroupCodeCnt(Map<String, Object> param) throws SQLException, Exception;
	
	/**
	 * 공통코드 다음 순서 가져오기
	 * @param param
	 * @return
	 * @throws Exception 
	 * @throws SQLException 
	 */
	Map<String, Object> selectCodeSqe(Map<String, Object> param) throws SQLException, Exception;
	
	/**
	 * 상위 공통코드 다음 가져오기
	 * @param param
	 * @return
	 * @throws Exception 
	 * @throws SQLException 
	 */
	Map<String, Object> selectNextTopCode() throws SQLException, Exception;
	
	/**
	 * 상위 공통코드 정보 저장하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int insertTopCodeInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 하위 공통코드 정보 저장하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int insertSubCodeInfo(Map<String, Object> param) throws SQLException , IOException;
	
	
	/**
	 * 상위 공통코드 정보 수정하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateTopCodeInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 하위 공통코드 정보 수정하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int updateSubCodeInfo(Map<String, Object> param) throws SQLException , IOException;
	
	
	/**
	 * 공통코드 정보 삭제하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int deleteTopCodeInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 하위 공통코드 정보 삭제하기
	 * @param param
	 * @return
	 * @throws Exception
	 */
	int deleteSubCodeInfo(Map<String, Object> param) throws SQLException , IOException;
	
	
}
