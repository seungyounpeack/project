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
package kr.go.guri.manager.codeMng.commonCodeMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.go.guri.manager.codeMng.commonCodeMng.service.CommonCodeMngService;

/**
 * 관리자 > 공통코드 관리용 Service Implement 클래스
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

@Service("commonCodeMngService")
public class CommonCodeMngServiceImpl extends EgovAbstractServiceImpl implements CommonCodeMngService {

	@Resource(name = "commonCodeMngMapper")
	private CommonCodeMngMapper commonCodeMngMapper;

	/**
	 * 상위 공통코드 목록 조회하기
	 */
	@Override
	public List<Map<String, Object>> selectTopCodeList() throws SQLException , Exception{
		return commonCodeMngMapper.selectTopCodeList();
	}
	
	/**
	 *  하위 공통코드 목록 조회하기
	 */
	@Override
	public List<Map<String, Object>> selectSubCodeList(Map<String, Object> param) throws SQLException , Exception{
		return commonCodeMngMapper.selectSubCodeList(param);
	}
	
	/**
	 *  특정 상위 공통코드의 서브코드 개수
	 */
	@Override
	public List<Map<String, Object>> selectGroupCodeCnt(Map<String, Object> param) throws SQLException , Exception{
		return commonCodeMngMapper.selectGroupCodeCnt(param);
	}
	
	/**
	 *  공통코드 시퀀스번호 조회하기
	 */
	@Override
	public Map<String, Object> selectCodeSqe(Map<String, Object> param) throws SQLException , Exception{
		return commonCodeMngMapper.selectCodeSqe(param);
	}

	
	/**
	 * 상위 공통코드 다음 조회하기
	 */
	@Override
	public Map<String, Object> selectNextTopCode() throws SQLException , Exception{
		return commonCodeMngMapper.selectNextTopCode();
	}
	
	
	/**
	 * 상위 공통코드 목록 저장하기
	 */
	@Override
	public int insertTopCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		return commonCodeMngMapper.insertTopCodeInfo(param);
	}
	
	/**
	 * 하위 공통코드 목록 저장하기
	 */
	@Override
	public int insertSubCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		return commonCodeMngMapper.insertSubCodeInfo(param);
	}
	
	
	/**
	 * 상위 공통코드 정보 수정하기
	 */
	@Override
	public int updateTopCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		return commonCodeMngMapper.updateTopCodeInfo(param);
	}
	
	/**
	 * 하위 공통코드 정보 수정하기
	 */
	@Override
	public int updateSubCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		return commonCodeMngMapper.updateSubCodeInfo(param);
	}
	
	
	/**
	 * 상위 공통코드 정보 삭제하기
	 */
	@Override
	public int deleteTopCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		return commonCodeMngMapper.deleteTopCodeInfo(param);
	}
	
	/**
	 * 하위 공통코드 정보 삭제하기
	 */
	@Override
	public int deleteSubCodeInfo(Map<String, Object> param) throws SQLException , IOException{
		return commonCodeMngMapper.deleteSubCodeInfo(param);
	}
	
}
